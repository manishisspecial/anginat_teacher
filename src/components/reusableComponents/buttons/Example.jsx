
"use client";
import React, { useState } from "react";
import Button from "./Button"; 
import { Plus, ChevronRight, Heart, Settings, Download, X } from "lucide-react";
const ButtonExample = () => {
  // State for controlling which states to show
  const [visibleStates, setVisibleStates] = useState({
    Default: true,
    Hover: true,
    Focused: true,
    Disabled: true
  });

  // State for controlling which variants to show
  const [visibleVariants, setVisibleVariants] = useState({
    Default: true,
    Leading: true,
    Trailing: true,
    Icon: true
  });

  // State for controlling button properties
  const [buttonProps, setButtonProps] = useState({
    text: "Button",
    size: "Default",
    type: "Secondary",
    fullWidth: false
  });

  // Toggle visibility of states
  const toggleStateVisibility = (state) => {
    setVisibleStates(prev => ({
      ...prev,
      [state]: !prev[state]
    }));
  };

  // Toggle visibility of variants
  const toggleVariantVisibility = (variant) => {
    setVisibleVariants(prev => ({
      ...prev,
      [variant]: !prev[variant]
    }));
  };

  // Icon mapping for different variants
  const getIconForVariant = (variant) => {
    switch (variant) {
      case "Leading": return <Plus className="w-4 h-4" />;
      case "Trailing": return <ChevronRight className="w-4 h-4" />;
      case "Icon": return <Heart className="w-4 h-4" />;
      default: return null;
    }
  };

  // Render a button row for a specific state
  const renderButtonRow = (state) => {
    if (!visibleStates[state]) return null;

    return (
      <div key={state} className="flex gap-4 items-center flex-wrap">
        <p className="w-20 font-medium text-sm">{state}:</p>

        {visibleVariants.Default && (
          <Button
            text={buttonProps.text}
            size={buttonProps.size}
            state={state}
            type={buttonProps.type}
            variant="Default"
            fullWidth={buttonProps.fullWidth}
            onClick={() => console.log(`${state} Default button clicked`)}
          />
        )}

        {visibleVariants.Leading && (
          <Button
            text={buttonProps.text}
            size={buttonProps.size}
            state={state}
            type={buttonProps.type}
            variant="Leading"
            leadingIcon={<Plus className="w-4 h-4" />}
            fullWidth={buttonProps.fullWidth}
            onClick={() => console.log(`${state} Leading icon button clicked`)}
          />
        )}

        {visibleVariants.Trailing && (
          <Button
            text={buttonProps.text}
            size={buttonProps.size}
            state={state}
            type={buttonProps.type}
            variant="Trailing"
            trailingIcon={<ChevronRight className="w-4 h-4" />}
            fullWidth={buttonProps.fullWidth}
            onClick={() => console.log(`${state} Trailing icon button clicked`)}
          />
        )}

        {visibleVariants.Icon && (
          <Button
            size={buttonProps.size}
            state={state}
            type={buttonProps.type}
            variant="Icon"
            leadingIcon={<Settings className="w-4 h-4" />}
            onClick={() => console.log(`${state} Icon-only button clicked`)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Button Component Showcase</h1>

      {/* Controls Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Controls</h2>

        {/* Button Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block font-medium mb-2 text-sm">Button Text:</label>
            <input
              type="text"
              value={buttonProps.text}
              onChange={(e) => setButtonProps(prev => ({ ...prev, text: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter button text"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-sm">Size:</label>
            <select
              value={buttonProps.size}
              onChange={(e) => setButtonProps(prev => ({ ...prev, size: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Default">Default</option>
              <option value="Compact">Compact</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2 text-sm">Type:</label>
            <select
              value={buttonProps.type}
              onChange={(e) => setButtonProps(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Tertiary">Tertiary</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2 text-sm">Full Width:</label>
            <div className="flex items-center h-10">
              <input
                type="checkbox"
                checked={buttonProps.fullWidth}
                onChange={(e) => setButtonProps(prev => ({ ...prev, fullWidth: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Enable full width</span>
            </div>
          </div>
        </div>

        {/* State Visibility Toggles */}
        <div>
          <h3 className="font-medium mb-3 text-sm">Visible States:</h3>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(visibleStates).map((state) => (
              <button
                key={state}
                onClick={() => toggleStateVisibility(state)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${visibleStates[state]
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* Variant Visibility Toggles */}
        <div>
          <h3 className="font-medium mb-3 text-sm">Visible Variants:</h3>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(visibleVariants).map((variant) => (
              <button
                key={variant}
                onClick={() => toggleVariantVisibility(variant)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${visibleVariants[variant]
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Button Examples Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Button Examples - Type: <span className="text-blue-600">{buttonProps.type}</span>
          </h2>
        </div>

        <div className="space-y-6">
          {["Default", "Hover", "Focused", "Disabled"].map(state => renderButtonRow(state))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-medium mb-4 text-lg text-gray-800">Quick Actions:</h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setVisibleStates({ Default: true, Hover: true, Focused: true, Disabled: true })}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Show All States
          </button>
          <button
            onClick={() => setVisibleStates({ Default: true, Hover: false, Focused: false, Disabled: false })}
            className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Show Only Default
          </button>
          <button
            onClick={() => setVisibleVariants({ Default: true, Leading: true, Trailing: true, Icon: true })}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Show All Variants
          </button>
          <button
            onClick={() => setVisibleVariants({ Default: true, Leading: false, Trailing: false, Icon: false })}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md text-sm font-medium hover:bg-yellow-700 transition-colors"
          >
            Show Only Default Variant
          </button>
          <button
            onClick={() => {
              setButtonProps({ text: "Sample Button", size: "Default", type: "Primary", fullWidth: false });
              setVisibleStates({ Default: true, Hover: true, Focused: true, Disabled: true });
              setVisibleVariants({ Default: true, Leading: true, Trailing: true, Icon: true });
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-4 text-lg text-gray-800">Usage Examples:</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium mb-2">Primary Actions:</h4>
            <div className="flex gap-3 flex-wrap">
              <Button type="Primary" text="Save Changes" />
              <Button type="Primary" text="Download" variant="Leading" leadingIcon={<Download className="w-4 h-4" />} />
              <Button type="Primary" text="Continue" variant="Trailing" trailingIcon={<ChevronRight className="w-4 h-4" />} />
            </div>
          </div>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium mb-2">Secondary Actions:</h4>
            <div className="flex gap-3 flex-wrap">
              <Button type="Secondary" text="Cancel" />
              <Button type="Secondary" text="Add Item" variant="Leading" leadingIcon={<Plus className="w-4 h-4" />} />
              <Button type="Secondary" variant="Icon" leadingIcon={<X className="w-4 h-4" />} />
            </div>
          </div>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium mb-2">Tertiary Actions:</h4>
            <div className="flex gap-3 flex-wrap">
              <Button type="Tertiary" text="Learn More" />
              <Button type="Tertiary" text="Settings" variant="Leading" leadingIcon={<Settings className="w-4 h-4" />} />
              <Button type="Tertiary" text="View Details" variant="Trailing" trailingIcon={<ChevronRight className="w-4 h-4" />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample;