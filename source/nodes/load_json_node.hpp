#pragma once

#include "node_macros.hpp"
#include <string>

class load_json_node : public node_base {
public:
    NODE_TYPE("load_json", "Load JSON", input)
    NODE_NO_INPUTS
    NODE_OUTPUTS(PIN("JSON", json))

    load_json_node() { init_outputs(); }

    void execute(node_graph& graph) override;
    void draw_properties() override;

private:
    std::string m_path;
};
