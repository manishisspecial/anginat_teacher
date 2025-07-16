import React from 'react'
import Card7 from '@/components/reusableComponents/Card/Card7'
import PersonalImageComponent from './PersonalImageComponent'

const PersonalImage = () => {
  return (
    <div className="w-full h-full">
            <Card7
                title="Profile Picture"
                showTitle={true}
                showPrimaryButton={false}
                showSecondaryButton={false}
                showSwapComponent1={true}
                showSwapComponent2={false}
                showSwapComponent3={false}
                showDescription={false}
                swapContent1={
                    <PersonalImageComponent 
                       
                    />
                }
                showMenuButton={false}
                className="h-full lg:h-auto"
                fullWidth={true}
            />
        </div>
  )
}

export default PersonalImage