
class LoginPage{
    get inputUsername(){
        return ('#user-name');
    }

    get inputPassword(){
        return ('#password');
    }

    get btnSubmit(){
        return ('#login-button');
    }

    login(username,password){
        cy.get(this.inputUsername).type(username);
        cy.get(this.inputPassword).type(password);
        cy.get(this.btnSubmit).click();
    }
}

export default new LoginPage()