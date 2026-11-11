#pragma once

#include "node_macros.hpp"
#include <string>

class save_json_node : public node_base {
public:
    NODE_TYPE("save_json", "Save JSON", output)
    NODE_INPUTS(PIN("JSON", json))
    NODE_NO_OUTPUTS

    save_json_node() { init_outputs(); }

    void execute(node_graph& graph) override;
    void draw_properties() override;

private:
    std::string m_path;
    int m_indent = 2;
};
