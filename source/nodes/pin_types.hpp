#pragma once

#include <cstdint>
#include <memory>
#include <span>
#include <string>
#include <string_view>
#include <variant>
#include <vector>

#include <nlohmann/json.hpp>

// ---------------------------------------------------------------------------
// Wire data types — only two kinds of data flow through wires
// ---------------------------------------------------------------------------
enum class pin_data_type { image, json };

// ---------------------------------------------------------------------------
// sprijt::image — C++ image with shared ownership for cheap wire copies
//
// Pixel data is always RGBA, 8 bits per channel, tightly packed.
// Shared via shared_ptr so passing through wires is a pointer copy.
// ---------------------------------------------------------------------------
namespace sprijt {

struct image {
    struct data {
        std::vector<uint8_t> pixels;
        int width    = 0;
        int height   = 0;
        int channels = 4; // always RGBA after load
    };

    std::shared_ptr<data> d;

    image() = default;

    image(int w, int h, int ch = 4)
        : d(std::make_shared<data>()) {
        d->width    = w;
        d->height   = h;
        d->channels = ch;
        d->pixels.resize(static_cast<size_t>(w) * h * ch, 0);
    }

    // Adopt raw pixel data (copies into vector)
    image(const uint8_t* pixels, int w, int h, int ch = 4)
        : d(std::make_shared<data>()) {
        d->width    = w;
        d->height   = h;
        d->channels = ch;
        auto sz = static_cast<size_t>(w) * h * ch;
        d->pixels.assign(pixels, pixels + sz);
    }

    int  width()    const { return d ? d->width    : 0; }
    int  height()   const { return d ? d->height   : 0; }
    int  channels() const { return d ? d->channels : 0; }

    uint8_t*       pixels()       { return d ? d->pixels.data() : nullptr; }
    const uint8_t* pixels() const { return d ? d->pixels.data() : nullptr; }

    std::span<uint8_t>       pixel_span()       { return d ? std::span(d->pixels) : std::span<uint8_t>{}; }
    std::span<const uint8_t> pixel_span() const { return d ? std::span<const uint8_t>(d->pixels) : std::span<const uint8_t>{}; }

    size_t stride() const { return d ? static_cast<size_t>(d->width) * d->channels : 0; }

    explicit operator bool() const { return d && !d->pixels.empty(); }
};

} // namespace sprijt

// ---------------------------------------------------------------------------
// pin_value — the runtime value carried by a wire (or "no value" if empty)
// ---------------------------------------------------------------------------
using pin_value = std::variant<std::monostate, sprijt::image, nlohmann::json>;

// ---------------------------------------------------------------------------
// pin_info — static metadata describing a single input or output pin
// ---------------------------------------------------------------------------
struct pin_info {
    std::string_view name;
    pin_data_type    data_type;
};

// ---------------------------------------------------------------------------
// node_category — determines header color
// ---------------------------------------------------------------------------
enum class node_category {
    input,    // green  header
    process,  // orange header
    output    // blue   header
};
