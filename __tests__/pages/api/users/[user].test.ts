import userHandler from 'pages/api/users/[user]'
import https from 'https'
import { EventEmitter } from 'node:events'
import { NextApiRequest, NextApiResponse } from 'next/types'

describe('api user works',()=>{

    it('should get userdata',async ()=>{
        const spyHttps = jest.spyOn(https, 'get').mockImplementationOnce((_, cb: any) => {
            const e: any = new EventEmitter()
            e.setEncoding = jest.fn()
      
            cb(e)
      
            e.emit('data', JSON.stringify({
                success:true,
                data:{
                    user_rank:123,
                    ac_problem_count:666,
                    problem_count: 2000
                }
            }))
            e.emit('end')
      
            return e as any
        })


        const jsonSpy = jest.fn()
        const statusSpy = jest.fn<any,Parameters<NextApiResponse['status']> >(()=>{
            return {
                json:jsonSpy
            }
        })

          
        await userHandler({query:{user:'jiangshanmeta'}} as unknown as NextApiRequest, {
            status:statusSpy,
            setHeader:jest.fn(),
        } as unknown as NextApiResponse )
        
        expect(spyHttps).toBeCalledTimes(1)
        expect(spyHttps.mock.calls[0][0]).toBe('https://www.lintcode.com/v2/api/accounts/jiangshanmeta/dashboard/')     


        expect(statusSpy).toBeCalledTimes(1)
        expect(statusSpy.mock.calls[0][0]).toBe(200)

        expect(jsonSpy).toBeCalledTimes(1)
        expect(jsonSpy.mock.calls[0][0]).toEqual({
            name:'jiangshanmeta',
            rank:123,
            solved:666,
            solvedOverTotal:`${666}/2000`,
            solvedPercentage:'33.3%',
            error:null
        })

    })

    it('should return errinfo when lintcode return success false',async ()=>{
        const spyHttps = jest.spyOn(https, 'get').mockImplementationOnce((_, cb: any) => {
            const e: any = new EventEmitter()
            e.setEncoding = jest.fn()
      
            cb(e)
      
            e.emit('data', JSON.stringify({
                success:false,
                detail: 'invalid userid'
            }))
            e.emit('end')
      
            return e as any
        })

        const jsonSpy = jest.fn()
        const statusSpy = jest.fn<any,Parameters<NextApiResponse['status']> >(()=>{
            return {
                json:jsonSpy
            }
        })

        await userHandler({query:{user:'InValidUserId'}} as unknown as NextApiRequest, {
            status:statusSpy,
            setHeader:jest.fn(),
        } as unknown as NextApiResponse )

        expect(statusSpy).toBeCalledTimes(1)
        expect(jsonSpy).toBeCalledTimes(1)
        expect(jsonSpy.mock.calls[0][0]).toEqual({
            name:'InValidUserId',
            error:'invalid userid'
        })

    })

    it('should handle http request error',async ()=>{
        jest.spyOn(https, 'get').mockImplementationOnce((_, cb: any) => {
            const res: any = {}
            res.setEncoding = jest.fn()
            res.on = (type: string, onCb: Function) => {
                if (type === 'error'){
                    onCb(new Error('fake error msg'))
                }
            }
            cb(res)
      
            return res as any
        })

        const jsonSpy = jest.fn()
        const statusSpy = jest.fn<any,Parameters<NextApiResponse['status']> >(()=>{
            return {
                json:jsonSpy
            }
        })

        await userHandler({query:{user:'jiangshanmeta'}} as unknown as NextApiRequest, {
            status:statusSpy,
            setHeader:jest.fn(),
        } as unknown as NextApiResponse )

        expect(statusSpy).toBeCalledTimes(1)
        expect(statusSpy.mock.calls[0][0]).toBe(200)

        expect(jsonSpy).toBeCalledTimes(1)
        expect(jsonSpy).lastCalledWith({
            name:'jiangshanmeta',
            error:'fake error msg'
        })
    })

    it('should handle invalid json',async ()=>{
        const spyHttps = jest.spyOn(https, 'get').mockImplementationOnce((_, cb: any) => {
            const e: any = new EventEmitter()
            e.setEncoding = jest.fn()
      
            cb(e)
      
            e.emit('data', "{invalid json")
            e.emit('end')
      
            return e as any
        })


        const jsonSpy = jest.fn()
        const statusSpy = jest.fn<any,Parameters<NextApiResponse['status']> >(()=>{
            return {
                json:jsonSpy
            }
        })

          
        await userHandler({query:{user:'jiangshanmeta'}} as unknown as NextApiRequest, {
            status:statusSpy,
            setHeader:jest.fn(),
        } as unknown as NextApiResponse )

        expect(statusSpy).toBeCalledTimes(1)
        expect(statusSpy).lastCalledWith(200)
        expect(jsonSpy).toHaveBeenCalledTimes(1)
        expect(jsonSpy.mock.calls[0][0]).toHaveProperty('error')
    })


})

