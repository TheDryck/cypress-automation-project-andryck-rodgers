module.exports = 
    [
        {
            username: "standard_user",
            password: "secret_sauce",
            expectedUrl: "https://www.saucedemo.com/inventory.html"
        },
        {
            username: "locked_out_user",
            password: "secret_sauce",
            message: "Epic sadface: Sorry, this user has been locked out.",
            expectedUrl: "https://www.saucedemo.com/"
        },
        {
            username: "problem_user",
            password: "secret_sauce",
            expectedUrl: "https://www.saucedemo.com/inventory.html"
        },
        {
            username: "performance_glitch_user",
            password: "secret_sauce",
            expectedUrl: "https://www.saucedemo.com/inventory.html"
        },
        {
            username: "invalid_user",
            password: "secret_sauce",
            expectedUrl: "https://www.saucedemo.com/",
            message: "Epic sadface: Username and password do not match any user in this service",
        },
    ]
;