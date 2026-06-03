exports.sendEmail = async (options) => {
    console.log(`Sending email to ${options.email} with subject: ${options.subject}`);
    return true;
};
