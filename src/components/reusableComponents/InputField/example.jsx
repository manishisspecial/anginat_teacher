'use client';

// app/example/page.jsx or pages/example.jsx (depending on your Next.js structure)

import Input from './inputField';

export default function ExamplePage() {
  const handleInputChange = (value) => {
    console.log('Input changed:', value);
  };

  const handleDropdownSelect = (option) => {
    console.log('Dropdown selected:', option);
  };

  const handleMultiSelect = (selectedOptions) => {
    console.log('Multi-select selected:', selectedOptions);
  };

  // Sample dropdown options
  const countryOptions = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Australia', value: 'AU' },
    { label: 'Germany', value: 'DE' },
    { label: 'France', value: 'FR' },
  ];

  const statusOptions = [
    'Active',
    'Inactive', 
    'Pending',
    'Suspended'
  ];

  const skillOptions = [
    { label: 'JavaScript', value: 'js' },
    { label: 'Python', value: 'py' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'Go', value: 'go' }
  ];

  const interestOptions = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'DevOps',
    'UI/UX Design',
    'Machine Learning'
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Enhanced Input Field Examples</h1>
      
      {/* Text Input Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Text Inputs</h2>
        <div className="space-y-4">
          <Input
            actionType="text"
            label="Basic Text Input"
            placeholder="Enter your text here"
            onChange={handleInputChange}
          />
          
          <Input
            actionType="text"
            label="Email Input"
            type="email"
            placeholder="Enter your email"
            showLeftIcon={true}
            onChange={handleInputChange}
          />
          
          <Input
            actionType="text"
            label="Password Input"
            type="password"
            placeholder="Enter your password"
            showRightIcon={true}
            onChange={handleInputChange}
          />
        </div>
      </section>

      {/* Dropdown Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Dropdown Inputs</h2>
        <div className="space-y-4">
          <Input
            actionType="dropdown"
            label="Select Country"
            placeholder="Choose a country"
            options={countryOptions}
            onChange={handleInputChange}
            onSelect={handleDropdownSelect}
          />
          
          <Input
            actionType="dropdown"
            label="Status"
            placeholder="Select status"
            options={statusOptions}
            showLeftIcon={true}
            onChange={handleInputChange}
            onSelect={handleDropdownSelect}
          />
          
          <Input
            actionType="dropdown"
            label="Large Dropdown"
            placeholder="Select an option"
            options={countryOptions}
            size="large"
            fullWidth={true}
            className="w-full"
            onChange={handleInputChange}
            onSelect={handleDropdownSelect}
          />
        </div>
      </section>

      {/* Multi-select Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Multi-select Inputs</h2>
        <div className="space-y-4">
          <Input
            actionType="dropdown"
            isMulti={true}
            label="Select Skills"
            placeholder="Choose your skills"
            options={skillOptions}
            onChange={handleInputChange}
            onSelect={handleMultiSelect}
          />
          
          <Input
            actionType="dropdown"
            isMulti={true}
            label="Areas of Interest"
            placeholder="Select your interests"
            options={interestOptions}
            showLeftIcon={true}
            onChange={handleInputChange}
            onSelect={handleMultiSelect}
          />
          
          <Input
            actionType="dropdown"
            isMulti={true}
            label="Large Multi-select"
            placeholder="Select multiple options"
            options={skillOptions}
            size="large"
            fullWidth={true}
            className="w-full"
            onChange={handleInputChange}
            onSelect={handleMultiSelect}
          />
        </div>
      </section>

      {/* Date Input Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Date Inputs</h2>
        <div className="space-y-4">
          <Input
            actionType="date"
            label="Birth Date"
            onChange={handleInputChange}
          />
          
          <Input
            actionType="date"
            label="Start Date"
            showLeftIcon={true}
            onChange={handleInputChange}
          />
          
          <Input
            actionType="date"
            label="Event Date"
            size="medium"
            showSupportingText={true}
            supportingText="Select the date for your event"
            onChange={handleInputChange}
          />
        </div>
      </section>

      {/* Error States */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Error States</h2>
        <div className="space-y-4">
          <Input
            actionType="text"
            label="Text with Error"
            placeholder="Enter valid email"
            showSupportingText={true}
            error={true}
            errorText="Please enter a valid email address"
            onChange={handleInputChange}
          />
          
          <Input
            actionType="dropdown"
            label="Dropdown with Error"
            placeholder="Select required option"
            options={statusOptions}
            showSupportingText={true}
            error={true}
            errorText="This field is required"
            onChange={handleInputChange}
            onSelect={handleDropdownSelect}
          />
          
          <Input
            actionType="date"
            label="Date with Error"
            showSupportingText={true}
            error={true}
            errorText="Date cannot be in the past"
            onChange={handleInputChange}
          />
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Disabled States</h2>
        <div className="space-y-4">
          <Input
            actionType="text"
            label="Disabled Text Input"
            placeholder="This is disabled"
            disabled={true}
            onChange={handleInputChange}
          />
          
          <Input
            actionType="dropdown"
            label="Disabled Dropdown"
            placeholder="Cannot select"
            options={statusOptions}
            disabled={true}
            onChange={handleInputChange}
            onSelect={handleDropdownSelect}
          />
          
          <Input
            actionType="date"
            label="Disabled Date"
            disabled={true}
            onChange={handleInputChange}
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
        <div className="space-y-4">
          <Input
            actionType="text"
            label="Small Input"
            size="small"
            placeholder="Small size"
            onChange={handleInputChange}
          />
          
          <Input
            actionType="dropdown"
            label="Medium Dropdown"
            size="medium"
            placeholder="Medium size"
            options={statusOptions}
            onChange={handleInputChange}
            onSelect={handleDropdownSelect}
          />
          
          <Input
            actionType="date"
            label="Large Date Input"
            size="large"
            onChange={handleInputChange}
          />
        </div>
      </section>
    </div>
  );
}