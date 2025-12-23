import React from 'react';
import Card from './evsCivilSer'; // Assuming Card component is correctly imported
import './evsCivil.css';

const CivilConstruction = () => {
  return (
    <div className="event-management-wrapper">
      <div class="event-management-title-container">
        <span class="line"></span>
        <h1 class="event-management-title">Civil Construction Services</h1>
        <span class="line"></span>
      </div>

      <div className="event-management-container">
        <Card
          title="Any Type of Building Construction"
          description="Comprehensive building construction services tailored to meet your specific project requirements, ensuring quality and efficiency throughout the construction process."
        />
        <Card
          title="Any Type of Building Maintenance"
          description="Professional building maintenance services to keep your property in optimal condition, ensuring safety and longevity."
        />
        <Card
          title="Wall Putty, Interior and Exterior Painting"
          description="Expert wall putty application and interior and exterior painting services to enhance the aesthetic appeal and durability of your building."
        />
        <Card
          title="Plumbing Work"
          description="Reliable plumbing services for both residential and commercial properties, including installation, repairs, and maintenance."
        />
        <Card
          title="Tile and Granite Work"
          description="High-quality tile and granite installation services to add elegance and durability to your interior spaces."
        />
        <Card
          title="Waterproofing Work"
          description="Effective waterproofing solutions to protect your building from water damage and maintain structural integrity."
        />
        <Card
          title="Pest Control"
          description="Professional pest control services to ensure a hygienic and safe environment within your premises."
        />
        <Card
          title="Anti-Termite Treatment"
          description="Specialized anti-termite treatments to protect your property from termite infestations and damage."
        />
        <Card
          title="Modular Kitchen"
          description="Customized modular kitchen design and installation services to optimize space and functionality in your home."
        />
        <Card
          title="Furniture Work"
          description="Bespoke furniture design and craftsmanship services to create functional and stylish furniture pieces for your interiors."
        />
        <Card
          title="Carpentry Work"
          description="Professional carpentry services for precise and durable woodwork solutions, tailored to your specific needs."
        />
      </div>
    </div>
  );
};

export default CivilConstruction;
