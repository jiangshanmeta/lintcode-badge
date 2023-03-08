import {
    act,
    fireEvent,
    render, 
    screen,

} from '@testing-library/react';

import { faImage } from "@fortawesome/free-regular-svg-icons";

import CopyToClipboard from 'components/CopyToClipboard';

import copy from 'copy-to-clipboard'


jest.mock('copy-to-clipboard',()=>{
    return jest.fn().mockImplementation(()=>{
        return true
    })
})


describe('CopyToClipboard Component',()=>{

    it('initial snapshot',()=>{
        const {
            container
        } = render(<CopyToClipboard icon={faImage} label="Copy Image URL" textToCopy='苟利国家生死以 岂因祸福避趋之'/>)

        expect(container.innerHTML).toMatchSnapshot()
    })

    it('should copy content to clipboard',async ()=>{

        render(<CopyToClipboard icon={faImage} label="Copy Image URL" textToCopy='苟利国家生死以' />)
        const box = screen.getByTestId('CopyToClipboardBox')
        fireEvent.click(box)

        expect(copy).toBeCalledTimes(1)
        expect(copy).lastCalledWith('苟利国家生死以')
    })

    it('props for tooltip should be right',()=>{

        jest.isolateModules(()=>{
            jest.doMock('@material-ui/core',()=>{
                const originalModule = jest.requireActual('@material-ui/core');
                return {
                    __esModule: true,
                    ...originalModule,
                    Tooltip:(props)=>{
                        return (
                            <div>
                                <div data-testid="open">{String(props.open)}</div>
                                <div data-testid="title">{props.title}</div>
                                <div data-testid="onOpen" onClick={()=>props.onOpen()}></div>
                                <div data-testid="onClose" onClick={()=>props.onClose()}></div>
                            </div>
                        )
                    },
                }
            })
            const {default:Component} = require('components/CopyToClipboard')

            render(<Component icon={faImage} label="Copy Image URL" textToCopy='苟利国家生死以 岂因祸福避趋之'  />)

            expect(screen.getByTestId('open').innerHTML).toBe('false')
            expect(screen.getByTestId('title').innerHTML).toBe('Copy to clipboard')

            fireEvent.click(screen.getByTestId('onOpen'))
            expect(screen.getByTestId('open').innerHTML).toBe('true')

            
            fireEvent.click(screen.getByTestId('onClose'))
            expect(screen.getByTestId('open').innerHTML).toBe('false')

        })

    })



    it('tooltip text should set to original text 500ms after tooltip close',()=>{
        
        jest.isolateModules(()=>{
            jest.doMock('@material-ui/core',()=>{
                const originalModule = jest.requireActual('@material-ui/core');
                return {
                    __esModule: true,
                    ...originalModule,
                    Tooltip:(props)=>{
                        return (
                            <div>
                                <div data-testid="open">{String(props.open)}</div>
                                <div data-testid="title">{props.title}</div>
                                <div data-testid="onOpen" onClick={()=>props.onOpen()}></div>
                                <div data-testid="onClose" onClick={()=>props.onClose()}></div>
                                <div>{props.children}</div>
                            </div>
                        )
                    },
                    Box:(props)=>{
                        return (
                            <div data-testid="box" onClick={()=>props.onClick()}></div>
                        )
                    }
                }
            })
            jest.useFakeTimers();
            const {default:Component} = require('components/CopyToClipboard')

            render(<Component icon={faImage} label="Copy Image URL" textToCopy='苟利国家生死以 岂因祸福避趋之'  />)

            fireEvent.click(screen.getByTestId('onOpen'))
            fireEvent.click( screen.getByTestId('box')  )
            expect( screen.getByTestId('title').innerHTML ).toBe('Copied!')

            fireEvent.click(screen.getByTestId('onClose'))

            act(()=>{
                jest.advanceTimersByTime(500)
            })
            
            expect( screen.getByTestId('title').innerHTML ).toBe('Copy to clipboard')

            jest.useRealTimers()
        })


    })


})