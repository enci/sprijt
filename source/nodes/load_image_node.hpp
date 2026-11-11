#pragma once

#include "node_macros.hpp"
#include <string>

class load_image_node : public node_base {
public:
    NODE_TYPE("load_image", "Load Image", input)
    NODE_NO_INPUTS
    NODE_OUTPUTS(PIN("Image", image))

    load_image_node() { init_outputs(); }

    void execute(node_graph& graph) override;
    void draw_properties() override;

private:
    std::string m_path;
};
