import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

const multerUploader = multerS3({
    s3: s3,
    bucket: "youtubejongseo",
});

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    // 로그인 되지 않은 사용자가의  undefine을 방지하기 위해 중괄호
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/");
    }
};
// multer을 사용학 ㅣ위해선   form(enctype="multipart/form-data") 폼의 설정을 해줘야하한다
// 1 미들웨어를 만든다
// 2 컨트롤러 말고 라우터에서 사용한다
// export const avatarUpload = multer({
//     // 파일을 보낼 장소
//     dest: "uploads/avatars/",
//     limits: {
//         fileSize: 300000000,
//     },
// });
// export const videoUpload = multer({
//     dest: "uploads/videos/",
// });

export const avatarUpload = multer({
    // 파일을 보낼 장소
    dest: "uploads/avatars/",
    limits: {
        fileSize: 300000000,
    },
    storage: multerUploader,
});
export const videoUpload = multer({
    dest: "uploads/videos/",
    storage: multerUploader,
});
