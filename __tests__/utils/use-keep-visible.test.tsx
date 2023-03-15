import { useRef } from 'react';

import useKeepVisible from 'utils/use-keep-visible'

import {
    fireEvent,
    render,
    screen,
} from '@testing-library/react';

const TestComponent:React.FC = ()=>{

    const ref = useRef<HTMLImageElement | null>(null);

    useKeepVisible(ref,20,13)

    return (
        <section style={{position:'relative'}}>
            <div ref={ref} style={{height:20,position:'relative'}} data-testid="target"></div>
        </section>
    )

}


describe('useKeepVisible',()=>{

    afterEach(()=>{
        fireEvent.scroll(window,{target:{scrollY:0}})
    })

    it('top should be 0 when target dom is in first screen by default',()=>{
        Object.defineProperty(window,'innerHeight',{
            writable:true,
            configurable:true,
            value:750
        })

        // jsdom 不支持 layout 所有的offsetTop这种都会返回0 用这种方式hack过去
        Object.defineProperty(HTMLDivElement.prototype,'offsetTop',{
            writable:true,
            configurable:true,
            value: 200,
        })

        render(<TestComponent />)

        const dom = screen.getByTestId('target')
        expect(getComputedStyle(dom).getPropertyValue('top')).toBe('0px')
    })

    it('top should be set correctly when target dom is not in first screen',()=>{
        Object.defineProperty(window,'innerHeight',{
            writable:true,
            configurable:true,
            value:750
        })

        // jsdom 不支持 layout 所有的offsetTop这种都会返回0 用这种方式hack过去
        Object.defineProperty(HTMLDivElement.prototype,'offsetTop',{
            writable:true,
            configurable:true,
            value: 1000,
        })

        render(<TestComponent />)

        const dom = screen.getByTestId('target')
        expect(getComputedStyle(dom).getPropertyValue('top')).toBe('-283px')
    })

    it('should reset top when scroll',()=>{
        Object.defineProperty(window,'innerHeight',{
            writable:true,
            configurable:true,
            value:750
        })

        // jsdom 不支持 layout 所有的offsetTop这种都会返回0 用这种方式hack过去
        Object.defineProperty(HTMLDivElement.prototype,'offsetTop',{
            writable:true,
            configurable:true,
            value: 1000,
        })

        render(<TestComponent />)


        fireEvent.scroll(window,{target:{scrollY:200}})

        const dom = screen.getByTestId('target')
        expect(getComputedStyle(dom).getPropertyValue('top')).toBe('-83px')
    })


    it('should handle resize',()=>{

        Object.defineProperty(window,'innerHeight',{
            writable:true,
            configurable:true,
            value: 750
        })

        // jsdom 不支持 layout 所有的offsetTop这种都会返回0 用这种方式hack过去
        Object.defineProperty(HTMLDivElement.prototype,'offsetTop',{
            writable:true,
            configurable:true,
            value: 1000,
        })

        render(<TestComponent />)

        Object.defineProperty(window,'innerHeight',{
            writable:true,
            configurable:true,
            value: 350
        })

        fireEvent.resize(window)

        const dom = screen.getByTestId('target')
        expect(getComputedStyle(dom).getPropertyValue('top')).toBe('-683px')

    })

    it('should remove listener handler when component unmount',()=>{
        Object.defineProperty(window,'innerHeight',{
            writable:true,
            configurable:true,
            value: 750
        })

        // jsdom 不支持 layout 所有的offsetTop这种都会返回0 用这种方式hack过去
        Object.defineProperty(HTMLDivElement.prototype,'offsetTop',{
            writable:true,
            configurable:true,
            value: 1000,
        })

        const {unmount} = render(<TestComponent />)
        const spyRemoveEventListener = jest.spyOn(window,'removeEventListener')

        unmount()

        expect(spyRemoveEventListener).toBeCalledTimes(2)
        expect(spyRemoveEventListener.mock.calls[0][0]).toBe('scroll')
        expect(spyRemoveEventListener.mock.calls[1][0]).toBe('resize')
    })

})