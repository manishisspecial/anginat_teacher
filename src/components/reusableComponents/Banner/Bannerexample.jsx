'use client'
import React from 'react'
import Banner11 from './Banner11'
import Badge from '../badges/Badge11'
import Button from '../buttons/Button'
import Link from '../Link/link'
import StateIcon from '../Icon/StateIcon'

const BannerExample = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Banner11
                variant="Default"
                type="Badge"
                state="Warning"
                theme="Dark"
                badgeComponent={<Badge size='Default' themes='Warning' type='Outline' variant='Default' />}
                actionComponent={<Button
                    text="Button"
                    state="Default"
                    type="Secondary"
                    variant="Default"
                    size="Compact"
                    leadingIcon={StateIcon}
                    onClick={() => console.log('Button clicked')}
                />}
                content="Lorem ipsum dolor sit amet, consectetur."
            />
            <Banner11
                type="Icon"
                state="Error"
                theme="Light"
                iconComponent={<StateIcon state="Warning" />}
                actionComponent={<Link
                    text="Link"
                    type="Default"
                    variant="Trailing"
                    size="Default"
                    icon={true}
                    onClick={() => console.log('Link clicked')}
                />}
            />


        </div>
    )
}

export default BannerExample;
