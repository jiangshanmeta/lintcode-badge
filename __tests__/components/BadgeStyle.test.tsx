import {
    fireEvent,
    render, 
    screen
} from '@testing-library/react';

import BadgeStyle from 'components/BadgeStyle'
import {DEFAULT_BADGE} from 'utils/badge'


describe('BadgeStyle Component',()=>{

    it('should render five candicates',()=>{
        const setBadge = jest.fn()

        const {
            container
        } = render(<BadgeStyle badge={DEFAULT_BADGE} setBadge={setBadge} />)

        expect(container.getElementsByClassName('MuiFormControlLabel-root').length).toBe(5)
        expect(container.innerHTML).toMatchSnapshot()
    })

    it('should call setBadge when select',()=>{
        const setBadge = jest.fn()

        render(<BadgeStyle badge={DEFAULT_BADGE} setBadge={setBadge} />)

        fireEvent.click(screen.getByAltText(/plastic/))
        
        expect(setBadge).toBeCalledTimes(1)

        let firstParam = setBadge.mock.calls[0][0]
        if(typeof firstParam === 'function'){
            firstParam = firstParam(DEFAULT_BADGE)
        }

        expect(firstParam).toEqual({
            ...DEFAULT_BADGE,
            style:'plastic'
        });
        
    })

})