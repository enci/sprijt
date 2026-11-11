#include "node_graph.hpp"
#include <algorithm>

const pin_value node_graph::s_empty_value = std::monostate{};

// ---------------------------------------------------------------------------
// Node management
// ---------------------------------------------------------------------------
node_base* node_graph::add_node(std::string_view type_name) {
    auto node = node_registry::instance().create(type_name);
    if (!node) return nullptr;

    node->set_id(next_node_id());
    auto* ptr = node.get();
    m_nodes.push_back(std::move(node));
    return ptr;
}

void node_graph::remove_node(int node_id) {
    // Remove all links connected to this node
    std::erase_if(m_links, [node_id](const graph_link& l) {
        return l.src_node == node_id || l.dst_node == node_id;
    });

    // Remove the node itself
    std::erase_if(m_nodes, [node_id](const std::unique_ptr<node_base>& n) {
        return n->id() == node_id;
    });
}

node_base* node_graph::find_node(int node_id) const {
    for (const auto& n : m_nodes)
        if (n->id() == node_id)
            return n.get();
    return nullptr;
}

// ---------------------------------------------------------------------------
// Link management
// ---------------------------------------------------------------------------
bool node_graph::can_link(int src_pin_id, int dst_pin_id) const {
    auto src = decode_pin_id(src_pin_id);
    auto dst = decode_pin_id(dst_pin_id);

    // Source must be an output, destination must be an input
    if (!src.is_output || dst.is_output) return false;

    // Cannot link a node to itself
    if (src.node_id == dst.node_id) return false;

    // Check that both nodes exist
    auto* src_node = find_node(src.node_id);
    auto* dst_node = find_node(dst.node_id);
    if (!src_node || !dst_node) return false;

    // Check pin indices are in range
    if (src.pin_index >= static_cast<int>(src_node->outputs().size())) return false;
    if (dst.pin_index >= static_cast<int>(dst_node->inputs().size()))  return false;

    // Data types must match
    auto src_type = src_node->outputs()[src.pin_index].data_type;
    auto dst_type = dst_node->inputs()[dst.pin_index].data_type;
    if (src_type != dst_type) return false;

    // An input can only have one connection
    for (const auto& l : m_links)
        if (l.dst_node == dst.node_id && l.dst_pin == dst.pin_index)
            return false;

    return true;
}

int node_graph::add_link(int src_pin_id, int dst_pin_id) {
    auto src = decode_pin_id(src_pin_id);
    auto dst = decode_pin_id(dst_pin_id);

    int link_id = next_link_id();
    m_links.push_back({
        link_id,
        src.node_id, src.pin_index,
        dst.node_id, dst.pin_index
    });

    // Mark the destination node and everything downstream dirty
    if (auto* n = find_node(dst.node_id))
        n->mark_dirty();
    mark_downstream_dirty(dst.node_id);

    return link_id;
}

void node_graph::remove_link(int link_id) {
    auto it = std::find_if(m_links.begin(), m_links.end(),
        [link_id](const graph_link& l) { return l.id == link_id; });

    if (it != m_links.end()) {
        int dst_node = it->dst_node;
        m_links.erase(it);

        // Mark the now-disconnected node dirty
        if (auto* n = find_node(dst_node))
            n->mark_dirty();
        mark_downstream_dirty(dst_node);
    }
}

// ---------------------------------------------------------------------------
// Pull-based evaluation
// ---------------------------------------------------------------------------
void node_graph::evaluate(int node_id) {
    auto* node = find_node(node_id);
    if (!node) return;

    // If already clean, nothing to do
    if (!node->is_dirty()) return;

    // First, recursively evaluate all upstream dependencies
    for (int i = 0; i < static_cast<int>(node->inputs().size()); ++i) {
        if (auto* link = find_link_to_input(node_id, i)) {
            evaluate(link->src_node);
        }
    }

    // Now execute this node
    node->execute(*this);
    node->clear_dirty();
}

// ---------------------------------------------------------------------------
// Input resolution
// ---------------------------------------------------------------------------
const pin_value& node_graph::get_input(int node_id, int input_index) const {
    if (auto* link = find_link_to_input(node_id, input_index)) {
        auto* src = find_node(link->src_node);
        if (src) return src->output_value(link->src_pin);
    }
    return s_empty_value;
}

// ---------------------------------------------------------------------------
// Dirty propagation — mark all downstream nodes dirty
// ---------------------------------------------------------------------------
void node_graph::mark_downstream_dirty(int node_id) {
    for (const auto& l : m_links) {
        if (l.src_node == node_id) {
            if (auto* n = find_node(l.dst_node)) {
                if (!n->is_dirty()) {
                    n->mark_dirty();
                    mark_downstream_dirty(l.dst_node); // recurse
                }
            }
        }
    }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------
const graph_link* node_graph::find_link_to_input(int node_id, int input_index) const {
    for (const auto& l : m_links)
        if (l.dst_node == node_id && l.dst_pin == input_index)
            return &l;
    return nullptr;
}
