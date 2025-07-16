import React from 'react';
import Button from '@/components/reusableComponents/buttons/Button';


const PersonalImageComponent = ({ 
  profileImageUrl = null,
  onUpdateClick = () => {},
  onDeleteClick = () => {}
}) => {
  // Fallback profile image or placeholder
  const imageSource = profileImageUrl || '/default-profile.png';

  return (
    <div className="flex flex-col justify-center items-center sm:items-start gap-4 sm:gap-6 w-full">
      {/* Profile Image */}
      <div className="w-full max-w-[300px] md:max-w-full rounded overflow-hidden">
        {profileImageUrl ? (
          <img
            src={imageSource}
            alt="Profile"
            className="w-full h-auto object-cover"
          />
        ) : (
          // Placeholder when no image is available
          <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="text-sm">No profile image</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Edit Text and Buttons */}
      <div className="w-full flex flex-col justify-start items-center sm:items-start gap-4">
        <div className="text-center sm:text-left text-black text-base font-bold px-1">
          Edit your photo
        </div>
        
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
          {/* Update Button */}
          <Button 
            type="Primary"
            size="Compact"
            state="Default"
            variant="Default"
            text="Update"
            onClick={onUpdateClick}
          />
          
          {/* Delete Button */}
          <Button 
            type="Secondary"
            size="Compact"
            state="Default"
            variant="Default"
            text="Delete"
            onClick={onDeleteClick}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalImageComponent;