#pragma once

#include "node_base.hpp"
#include "node_registry.hpp"
#include <memory>
#include <string_view>
#include <vector>

// ---------------------------------------------------------------------------
// Pin ID encoding
//   pin_id = node_id * 256 + pin_index
//   Input pins:  indices 0 .. N-1
//   Output pins: indices 128 .. 128+M-1   (offset by 128 to separate from inputs)
// ---------------------------------------------------------------------------
struct pin_address {
    int node_id;
    int pin_index;   // 0-based within inputs or outputs
    bool is_output;
};

inline int encode_pin_id(int node_id, int pin_index, bool is_output) {
    return node_id * 256 + (is_output ? 128 + pin_index : pin_index);
}

inline pin_address decode_pin_id(int pin_id) {
    int node_id   = pin_id / 256;
    int local     = pin_id % 256;
    bool is_output = local >= 128;
    int pin_index  = is_output ? local - 128 : local;
    return { node_id, pin_index, is_output };
}

// ---------------------------------------------------------------------------
// graph_link — a connection between two pins
// ---------------------------------------------------------------------------
struct graph_link {
    int id;
    int src_node;   // node that owns the output pin
    int src_pin;    // output pin index (0-based)
    int dst_node;   // node that owns the input pin
    int dst_pin;    // input pin index (0-based)
};

// ---------------------------------------------------------------------------
// node_graph — owns all nodes and links, manages evaluation
// ---------------------------------------------------------------------------
class node_graph {
public:
    node_graph() = default;

    // --- Node management ---
    node_base* add_node(std::string_view type_name);
    void       remove_node(int node_id);
    node_base* find_node(int node_id) const;

    // --- Link management ---
    bool can_link(int src_pin_id, int dst_pin_id) const;
    int  add_link(int src_pin_id, int dst_pin_id);
    void remove_link(int link_id);

    // --- Evaluation (pull-based) ---
    void evaluate(int node_id);

    // --- Input resolution (called by nodes during execute()) ---
    // Returns the upstream output value wired to the given input pin,
    // or a monostate if nothing is connected.
    const pin_value& get_input(int node_id, int input_index) const;

    // Typed convenience wrapper
    template<typename T>
    const T* get_input_as(int node_id, int input_index) const {
        const auto& val = get_input(node_id, input_index);
        return std::get_if<T>(&val);
    }

    // --- Dirty propagation ---
    void mark_downstream_dirty(int node_id);

    // --- Accessors ---
    const std::vector<std::unique_ptr<node_base>>& nodes() const { return m_nodes; }
    const std::vector<graph_link>&                  links() const { return m_links; }

private:
    int next_node_id() { return m_next_node_id++; }
    int next_link_id() { return m_next_link_id++; }

    // Find which link feeds the given input pin (if any)
    const graph_link* find_link_to_input(int node_id, int input_index) const;

    std::vector<std::unique_ptr<node_base>> m_nodes;
    std::vector<graph_link>                 m_links;
    int m_next_node_id = 1;
    int m_next_link_id = 1;

    static const pin_value s_empty_value; // monostate sentinel
};
