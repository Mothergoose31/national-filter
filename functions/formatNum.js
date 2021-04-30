import React from 'react'

export default function formatNum(number) {
    return new Intl.NumberFormat("en-US").format(number)
}
