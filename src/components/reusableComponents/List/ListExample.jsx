import React from 'react';
import ListItem from './List';
import Avatarsexample from '../Avatars/Avatars11';
import Button from '../buttons/Button';
  
// Example avatar and button components
const ExampleAvatar = () => (
  <div style={{
    width: 40,
    height: 40,
    borderRadius: '100px',
    background: '#fff',
    color: '#0364F3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 400,
    lineHeight: '24px',
    position: 'absolute',
    left: 4,
    top: 4
  }}>
    A
  </div>
);

const ExampleButton = () => (
  <div style={{
    padding: '8px 16px',
    background: '#0364F3',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 14,
    fontFamily: 'Arial',
    fontWeight: 400,
    lineHeight: '24px',
    cursor: 'pointer'
  }}>
    Button
  </div>
);

const ListExample = () => (
  <div style={{ background: '#111', minHeight: '100vh', padding: 40 }}>
    <ListItem
      label="Label"
      title="List item"
      description="Supporting line text lorem ipsum dolor sit amet, consectetur."
      avatar={<Avatarsexample  variant="Name-outline" letter="A" size="XL" />}
      button={<Button type="primary" size="compact" state="default">Button</Button>}
      showAvatar={true}
      showButton={true}
    />
    <br />
    {/* <ListItem
      label="Label"
      title="No Avatar"
      description="This item hides the avatar."
      button={<ExampleButton />}
      showAvatar={false}
      showButton={true}
    />
    <br />
    <ListItem
      label="Label"
      title="No Button"
      description="This item hides the button."
      avatar={<ExampleAvatar />}
      showAvatar={true}
      showButton={false}
    /> */}
  </div>
);

export default ListExample; 