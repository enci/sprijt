#pragma once

#include "node_base.hpp"
#include "node_registry.hpp"

// ---------------------------------------------------------------------------
// NODE_TYPE — implements type_name(), display_name(), category()
// ---------------------------------------------------------------------------
#define NODE_TYPE(type_str, display_str, cat)                                 \
    std::string_view type_name()  const override { return type_str; }        \
    std::string_view display_name() const override { return display_str; }   \
    node_category    category()   const override { return node_category::cat; }

// ---------------------------------------------------------------------------
// NODE_INPUTS / NODE_OUTPUTS — implements inputs() / outputs() with a
// static constexpr pin_info array.  Use PIN() to define each entry.
// ---------------------------------------------------------------------------
#define NODE_INPUTS(...)                                                      \
    std::span<const pin_info> inputs() const override {                      \
        static constexpr pin_info pins[] = { __VA_ARGS__ };                  \
        return pins;                                                         \
    }

#define NODE_OUTPUTS(...)                                                     \
    std::span<const pin_info> outputs() const override {                     \
        static constexpr pin_info pins[] = { __VA_ARGS__ };                  \
        return pins;                                                         \
    }

#define NODE_NO_INPUTS                                                        \
    std::span<const pin_info> inputs() const override { return {}; }

#define NODE_NO_OUTPUTS                                                       \
    std::span<const pin_info> outputs() const override { return {}; }

// ---------------------------------------------------------------------------
// PIN — shorthand for a single pin_info entry
// Usage: PIN("Image", image)  →  pin_info{ "Image", pin_data_type::image }
// ---------------------------------------------------------------------------
#define PIN(name_str, dtype)  pin_info{ name_str, pin_data_type::dtype }

// ---------------------------------------------------------------------------
// REGISTER_NODE — place in the .cpp file to self-register the node type.
// Uses a static-initializer lambda that runs before main().
// ---------------------------------------------------------------------------
#define REGISTER_NODE(cls)                                                    \
    static bool s_##cls##_reg = [] {                                         \
        node_registry::instance().register_type(                             \
            #cls,                                                            \
            []() -> std::unique_ptr<node_base> {                             \
                return std::make_unique<cls>();                               \
            });                                                              \
        return true;                                                         \
    }();
