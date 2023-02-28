import {
    fireEvent,
    render, 
} from '@testing-library/react';

import BadgeContent from 'components/BadgeContent';

import { DEFAULT_BADGE } from 'utils/badge';


describe('BadgeContent Component',()=>{
    beforeEach(()=>{
        jest.resetModules()
    })

    it('snapshot',()=>{
        const setBadge = jest.fn();

        const {
            container,
            rerender
        } = render(<BadgeContent badge={DEFAULT_BADGE} setBadge={setBadge} />)

        expect(container.innerHTML).toMatchSnapshot()

        rerender(<BadgeContent badge={{
            ...DEFAULT_BADGE,
            contentPreset:'custom'
        }} setBadge={setBadge}  />)

        expect(container.innerHTML).toMatchSnapshot()
    })

    describe('should handle preset change',()=>{


        it('when target is not custom',()=>{

            jest.doMock('@material-ui/core',()=>{
                return {
                    __esModule: true,
                    FormControl:(props)=>{
                        return props.children;
                    },
                    FormLabel:()=>{
                        return <div></div>
                    },
                    InputLabel:()=>{
                        return <div></div>
                    },
                    MenuItem:()=>{
                        return <div></div>
                    },
                    Select:(props)=>{
                        return <div id={props.id} onClick={()=>props.onChange({target:{value:'solved-percentage'}})  }></div>
                    },
                    TextField:()=>{
                        return <div></div>
                    },
    
                }
            
            
            })
    
            return import('@material-ui/core').then(()=>{
    
                const {default:Component} = require('components/BadgeContent')
                const setBadge = jest.fn();
    
                const {
                    container,
                } = render(<Component badge={DEFAULT_BADGE} setBadge={setBadge} />)

                fireEvent.click(container.querySelector('#badge-content-preset-select'))
    
                expect(setBadge).toBeCalledTimes(1)
    
                const firstCall = setBadge.mock.calls[0][0](DEFAULT_BADGE)
            
                expect(firstCall).toEqual({
                    ...DEFAULT_BADGE,
                    contentPreset:'solved-percentage',
                    label:'Solved',
                    value:'solved-percentage'
                })
                
            })
            
        })

        it('when target is custom',()=>{
            jest.doMock('@material-ui/core',()=>{
                return {
                    __esModule: true,
                    FormControl:(props)=>{
                        return props.children;
                    },
                    FormLabel:()=>{
                        return <div></div>
                    },
                    InputLabel:()=>{
                        return <div></div>
                    },
                    MenuItem:()=>{
                        return <div></div>
                    },
                    Select:(props)=>{
                        return <div id={props.id} onClick={()=>props.onChange({target:{value:'custom'}})  }></div>
                    },
                    TextField:()=>{
                        return <div></div>
                    },
    
                }
            
            
            })
    
            return import('@material-ui/core').then(()=>{
    
                const {default:Component} = require('components/BadgeContent')
                const setBadge = jest.fn();
    
                const {
                    container,
                } = render(<Component badge={DEFAULT_BADGE} setBadge={setBadge} />)
    
                fireEvent.click(container.querySelector('#badge-content-preset-select'))
    
                expect(setBadge).toBeCalledTimes(1)
    
                const firstCall = setBadge.mock.calls[0][0](DEFAULT_BADGE)
            
                expect(firstCall).toEqual({
                    ...DEFAULT_BADGE,
                    contentPreset:'custom',
                })
                
            })

        })

    })
 

    it('Displayed value change works',()=>{
        jest.doMock('@material-ui/core',()=>{
            return {
                __esModule: true,
                FormControl:(props)=>{
                    return props.children;
                },
                FormLabel:()=>{
                    return <div></div>
                },
                InputLabel:()=>{
                    return <div></div>
                },
                MenuItem:()=>{
                    return <div></div>
                },
                Select:(props)=>{
                    return <div id={props.id} onClick={()=>props.onChange({target:{value:'solvedPercentage'}})  }></div>
                },
                TextField:()=>{
                    return <div></div>
                },

            }
        
        
        })

        return import('@material-ui/core').then(()=>{

            const {default:Component} = require('components/BadgeContent')
            const setBadge = jest.fn();

            const initialBadge = {
                ...DEFAULT_BADGE,
                contentPreset:'custom'
            }

            const {
                container,
            } = render(<Component badge={initialBadge} setBadge={setBadge} />)

            fireEvent.click(container.querySelector('#badge-value-select'))

            expect(setBadge).toBeCalledTimes(1)

            const firstCall = setBadge.mock.calls[0][0](initialBadge)
        
            expect(firstCall).toEqual({
                ...DEFAULT_BADGE,
                contentPreset:'custom',
                value:'solvedPercentage'
            })
            
        })

    })

    it('Label change works',()=>{
        jest.doMock('@material-ui/core',()=>{
            return {
                __esModule: true,
                FormControl:(props)=>{
                    return props.children;
                },
                FormLabel:()=>{
                    return <div></div>
                },
                InputLabel:()=>{
                    return <div></div>
                },
                MenuItem:()=>{
                    return <div></div>
                },
                Select:(props)=>{
                    return <div></div>
                },
                TextField:(props)=>{
                    return <div id={props.id} onClick={()=>props.onChange({target:{value:'sakura'}}) }></div>
                },
            }
        
        
        })

        return import('@material-ui/core').then(()=>{

            const {default:Component} = require('components/BadgeContent')
            const setBadge = jest.fn();

            const {
                container,
            } = render(<Component badge={DEFAULT_BADGE} setBadge={setBadge} />)

            fireEvent.click(container.querySelector('#badge-label'))

            expect(setBadge).toBeCalledTimes(1)

            const firstCall = setBadge.mock.calls[0][0](DEFAULT_BADGE)
        
            expect(firstCall).toEqual({
                ...DEFAULT_BADGE,
                label:'sakura'
            })
            
        })

    })


})