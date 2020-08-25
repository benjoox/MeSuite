import React from 'react'
import { Image } from 'react-bootstrap'

const Avatar = ({ picture }) => (
    <Image style={{ width: '50px' }} src={picture} roundedCircle />
)

export default Avatar
