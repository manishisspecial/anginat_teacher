import React from 'react';
import Card43 from './Card4';
import Button from '../buttons/Button';
import Link from '../Link/link';
/**
 * Card1Example - Demo page for Card component with image, title, description, and toggles
 */
const Card43Example = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card43
                imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                title=" Title"
                description="This is a customizable card. You can change the title, description, image, and toggle the label and swap sections."
                showLabels={true}
                showSwapComponent={true}
                width="360px"
                titleFontSize='24px'
                descriptionFontSize='14px'
                showSwapComponent1={false}
                showSwapComponent2={true}
                showSwapComponent3={false}
                swapLabel1="Main Info"
                actionType="link"
                showButtons={true}
                primaryComponent={<Link
                    text="Link 1"
                    type="Text link"
                    variant="Trailing"
                    size="Default"
                    icon={true}         
                    
                />}
                secondaryComponent={<Link
                    text="Link 2"
                    type="Text link"
                    variant="Trailing"
                    size="Default"
                    icon={true}
                    
                />}
                titleType="link"
                titleHref="https://www.google.com"
                showDescription={true}
            />
        </div>
    );
};

export default Card43Example; 