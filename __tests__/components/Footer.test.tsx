import {
    render, 
    screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from 'components/Footer'

describe('Component Footer',()=>{
    it('should match snapshot',()=>{
        const {
            container,
        } = render(<Footer/>);

        expect(container.innerHTML).toMatchSnapshot()
    })
})