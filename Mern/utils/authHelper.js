import bcrypt from 'bcrypt';
import colors  from 'colors';


const hashPassword=async (password)=>{
    try {
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(password,salt);
        return hashedPassword;
    } catch (error) {
        console.log(`error while hashing password ${error}`.bgRed.white)
    }

}

const comparePassword=async(password,hashedPassword)=>{

    try {
        const result=await bcrypt.compare(password,hashedPassword);
        return result;
    } catch (error) {
        console.log(`password did not match ${error}`.bgRed.white)
    }

}

export {
    comparePassword,
    hashPassword
}