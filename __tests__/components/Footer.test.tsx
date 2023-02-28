import {
    render, 
} from '@testing-library/react';

import Footer from 'components/Footer'

describe('Component Footer',()=>{
    it('should match snapshot',()=>{
        const {
            container,
        } = render(<Footer/>);

        expect(container.innerHTML).toMatchSnapshot()
    })
})