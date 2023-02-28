import {getUrl,getMarkdown,DEFAULT_BADGE} from 'utils/badge'

describe('Util badge',()=>{

    it('getUrl should work',()=>{

        const url = getUrl(DEFAULT_BADGE)

        expect(url).toBe('https://img.shields.io/badge/dynamic/json?style=for-the-badge&labelColor=black&color=%2312B4FF&label=Solved&query=solvedOverTotal&url=https%3A%2F%2Flintcode-badge.vercel.app%2Fapi%2Fusers%2Fjiangshanmeta')
    })

    it('getMarkdown should word',()=>{
        const markdown = getMarkdown(DEFAULT_BADGE)
        expect(markdown).toBe('[![LeetCode user jiangshanmeta](https://img.shields.io/badge/dynamic/json?style=for-the-badge&labelColor=black&color=%2312B4FF&label=Solved&query=solvedOverTotal&url=https%3A%2F%2Flintcode-badge.vercel.app%2Fapi%2Fusers%2Fjiangshanmeta)](https://lintcode.com/user/jiangshanmeta/)')
    })

})