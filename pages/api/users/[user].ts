
import type { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'
interface LintCodeResponse {
    data:{
        user_rank:number;
        ac_problem_count:number;
        problem_count:number;
    };
    success:boolean;
    detail?:string;
}

const handler = async (req:NextApiRequest,res:NextApiResponse)=>{
    const userName = req.query.user as string;
    res.setHeader("Content-Type", "application/json");

    try{
        const userInfo = await new Promise<LintCodeResponse>((resolve,reject)=>{
            https.get(`https://www.lintcode.com/v2/api/accounts/${userName}/dashboard/`,
            (res2)=>{
                res2.setEncoding('utf8');
                let rawData = ''
                res2.on('data', (chunk) => {
                  rawData += chunk
                })
                res2.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (e) {
                        reject(e)
                    }
                })

            })
        })

        if(!userInfo.success){
            res.status(200).json({
                name:userName,
                error:userInfo.detail
            });
            return;
        }

        const {
            user_rank,
            ac_problem_count,
            problem_count
        } = userInfo.data

        res.status(200).json({
            name:userName,
            rank:user_rank,
            solved:ac_problem_count,
            solvedOverTotal:`${ac_problem_count}/${problem_count}`,
            solvedPercentage:`${((ac_problem_count / problem_count) * 100).toFixed(1)}%`,
            error:null,
        });
        
    }catch(err){
        res.status(200).json({
            name:userName,
            error:err
        });
    }

}

export default handler