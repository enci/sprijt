#pragma once

#include "pin_types.hpp"
#include <vector>

class node_graph; // forward declaration

class node_base {
public:
    virtual ~node_base() = default;

    // --- Identity (assigned by graph on creation) ---
    int  id() const               { return m_id; }
    void set_id(int id)           { m_id = id; }

    // --- Static metadata (implemented via macros in subclasses) ---
    virtual std::string_view           type_name()    const = 0;
    virtual std::string_view           display_name() const = 0;
    virtual node_category              category()     const = 0;
    virtual std::span<const pin_info>  inputs()       const = 0;
    virtual std::span<const pin_info>  outputs()      const = 0;

    // --- Execution ---
    virtual void execute(node_graph& graph) = 0;

    // --- Side-panel parameters (override to draw ImGui widgets) ---
    virtual void draw_properties() {}

    // --- Output access (called by graph when downstream pulls) ---
    const pin_value& output_value(int output_index) const {
        return m_output_values[output_index];
    }

    // --- Dirty tracking ---
    bool is_dirty() const  { return m_dirty; }
    void mark_dirty()      { m_dirty = true; }
    void clear_dirty()     { m_dirty = false; }

protected:
    void set_output(int output_index, pin_value value) {
        if (output_index >= 0 && output_index < static_cast<int>(m_output_values.size()))
            m_output_values[output_index] = std::move(value);
    }

    // Call in constructor to size the output vector based on outputs().size()
    void init_outputs() {
        m_output_values.resize(outputs().size());
    }

private:
    int  m_id    = 0;
    bool m_dirty = true;
    std::vector<pin_value> m_output_values;
};
