import React from 'react'
import Label from './Lable'
import StateIcon from '../Icon/StateIcon'


const LableExample = () => {
  return (
    <div>
      <Label variant="trailing" theme="black" size="small"  text="Label" icon={<StateIcon state="Error" variant='outlined'   strokeColor="black" />} textcolor="black" />
    
    </div>
  )
}

export default LableExample 