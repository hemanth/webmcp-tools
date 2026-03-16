// Register WebMCP Tools natively
const modelContext = navigator.modelContext || navigator.modelContextTesting;
if (modelContext) {
    modelContext.registerTool({
        name: "filter_properties",
        description: "Filters the real estate properties displayed on the map and list based on criteria like price, property type, area, bedrooms, energy class, and specific features.",
        inputSchema: {
            type: "object",
            properties: {
                types: {
                    type: "array",
                    items: { type: "string" },
                    description: "Property types to include (e.g., 'Apartment', 'House', 'Studio')."
                },
                min_price: {
                    type: "number",
                    description: "Minimum price in USD ($)."
                },
                max_price: {
                    type: "number",
                    description: "Maximum price in USD ($)."
                },
                min_area: {
                    type: "number",
                    description: "Minimum living area in sq ft."
                },
                min_bedrooms: {
                    type: "number",
                    description: "Minimum number of bedrooms."
                },
                features: {
                    type: "array",
                    items: {
                        type: "string",
                        enum: ["Balcony", "Terrace", "Elevator", "Parking", "Central AC"]
                    },
                    description: "Must-have amenities/features (e.g. 'Central AC', 'Parking')."
                }
            }
        },
        execute: async (params) => {
            try {
                // Update Types
                if (params.types) {
                    document.querySelectorAll('.type-filter').forEach(el => {
                        el.checked = params.types.includes(el.value);
                    });
                }
                
                // Update Price
                const slider = document.getElementById('price-slider');
                if (slider && slider.noUiSlider) {
                    let minP = params.min_price !== undefined ? params.min_price : 0;
                    let maxP = params.max_price !== undefined ? params.max_price : 5000000;
                    slider.noUiSlider.set([minP, maxP]);
                }
                
                // Update Area
                if (params.min_area !== undefined) {
                    document.getElementById('filter-minArea').value = params.min_area;
                }
                
                // Update Bedrooms
                if (params.min_bedrooms !== undefined) {
                    let val = params.min_bedrooms.toString();
                    if (val > 4) val = '4'; // Max is 4+
                    document.querySelectorAll('input[name="minBedrooms"]').forEach(el => {
                        el.checked = (el.value === val);
                    });
                }
                
                // Update Features
                if (params.features) {
                    document.querySelectorAll('.feature-filter').forEach(el => {
                        el.checked = params.features.includes(el.value);
                    });
                }
                
                // Apply filters
                window.realEstateApp.applyFilters();
                window.realEstateApp.updatePriceDisplay();
                
                const visibleCount = window.realEstateApp.markers.filter(m => m.getVisible() !== false).length;
                window.realEstateApp.showAlert(`Filters applied. ${visibleCount} properties found.`);
                
                return { status: "success", visible_properties_count: visibleCount };
            } catch (error) {
                return { status: "error", message: error.message };
            }
        }
    });

    modelContext.registerTool({
        name: "clear_filters",
        description: "Resets all filters to their default states and shows all available properties.",
        inputSchema: {
            type: "object",
            properties: {}
        },
        execute: async () => {
            window.realEstateApp.clearFilters();
            return { status: "success", message: "All filters cleared." };
        }
    });

    modelContext.registerTool({
        name: "view_property_details",
        description: "Focuses the map on a specific property by ID and opens its details window.",
        inputSchema: {
            type: "object",
            properties: {
                property_id: {
                    type: "integer",
                    description: "The ID of the property to view."
                }
            },
            required: ["property_id"]
        },
        execute: async (params) => {
            const marker = window.realEstateApp.markers.find(m => m.propertyData.id === params.property_id);
            if (!marker) {
                return { status: "error", message: `Property with ID ${params.property_id} not found.` };
            }
            window.realEstateApp.panToProperty(marker.propertyData.lat, marker.propertyData.lng);
            
            // Trigger click to open info window
            if (google && google.maps && google.maps.event) {
                google.maps.event.trigger(marker, 'click');
            }
            
            window.realEstateApp.showAlert(`Viewing details for property ${params.property_id}`);
            return { 
                status: "success", 
                property_details: marker.propertyData
            };
        }
    });
} else {
    console.warn("navigator.modelContext is not defined. Using WebMCP shim for testing.");
    // Expose a testing shim just in case we are in devtools without proper capability
    window.navigator.modelContextTesting = {
         registerTool: (t) => {
             window.registeredWebMcpTools = window.registeredWebMcpTools || [];
             window.registeredWebMcpTools.push(t);
         }
    };
}


