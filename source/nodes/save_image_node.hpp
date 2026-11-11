#pragma once

#include "node_macros.hpp"
#include <string>

class save_image_node : public node_base {
public:
    NODE_TYPE("save_image", "Save Image", output)
    NODE_INPUTS(PIN("Image", image))
    NODE_NO_OUTPUTS

    save_image_node() { init_outputs(); }

    void execute(node_graph& graph) override;
    void draw_properties() override;

private:
    std::string m_path;
};
