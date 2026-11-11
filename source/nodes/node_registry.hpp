#pragma once

#include "node_base.hpp"
#include <functional>
#include <string>
#include <string_view>
#include <vector>

// ---------------------------------------------------------------------------
// node_registry — singleton that holds factory functions for every node type.
// Nodes self-register via REGISTER_NODE() in their .cpp files.
// Used by the "Add Node" context menu to list available types and create them.
// ---------------------------------------------------------------------------
class node_registry {
public:
    using factory_fn = std::function<std::unique_ptr<node_base>()>;

    struct entry {
        std::string type_name;
        factory_fn  factory;
    };

    static node_registry& instance() {
        static node_registry reg;
        return reg;
    }

    void register_type(std::string_view type_name, factory_fn factory) {
        m_entries.push_back({ std::string(type_name), std::move(factory) });
    }

    std::unique_ptr<node_base> create(std::string_view type_name) const {
        for (const auto& e : m_entries)
            if (e.type_name == type_name)
                return e.factory();
        return nullptr;
    }

    const std::vector<entry>& entries() const { return m_entries; }

private:
    node_registry() = default;
    std::vector<entry> m_entries;
};
