import {clerkClient}  from '@clerk/express'

// Middleware (Protect Educator Routes)

export const protectEducator = async (req, res, next) => {
    try{
        // Check if user is authenticated
        if(!req.auth || !req.auth.userId){
            return res.status(401).json({success:false,message:"Unauthorized - Please login"})
        }

        const userId = req.auth.userId;
        const response = await clerkClient.users.getUser(userId); 

        if(!response.publicMetadata || response.publicMetadata.role !== 'educator'){
            return res.status(403).json({success:false,message:"Unauthorized Access - Only educators can access this"})
        }

        next()

    } catch(error){
        console.error('Auth error:', error)
        res.status(401).json({success:false,message:error.message})
    }
}