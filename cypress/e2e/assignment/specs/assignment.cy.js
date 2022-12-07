
import Login from '../pageobjects/login.page'
import data from '../data/login.data'
import productData from '../data/products.data'

describe('SauceDemo Automation Workflow', ()=>{

    /* beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/')
    }) */

    for(const d of data){
        it(`should login as ${d.username}`, ()=>{
            cy.visit('https://www.saucedemo.com/')
            Login.login(d.username, d.password);

            if(d.username === "invalid_user" || d.username === "locked_out_user"){
                cy.url().should('eq', d.expectedUrl);
            }else{
                cy.url().should('eq', d.expectedUrl);
                cy.get('.inventory_list').should('be.visible');
            }    
        })
    }

    it('Add single product to cart', ()=>{
        cy.visit('https://www.saucedemo.com/');
        Login.login('standard_user', 'secret_sauce');

        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', 1)
    })

    it('Add multiple items to cart', ()=>{
        cy.visit('https://www.saucedemo.com/');
        Login.login('standard_user', 'secret_sauce');

        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-bike-light').click();
        cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click();
        cy.get('.shopping_cart_badge').should('have.text', 3);
    })

    it('Remove item from cart on Products page', ()=>{
        cy.visit('https://www.saucedemo.com/');
        Login.login('standard_user', 'secret_sauce');

        cy.get('#add-to-cart-sauce-labs-backpack').click();

        cy.get('#remove-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('not.exist');
    })

    it('Add item to cart then remove on cart page', ()=>{
        cy.visit('https://www.saucedemo.com/');
        Login.login('standard_user', 'secret_sauce');

        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', 1);
        cy.get('.shopping_cart_link').click();
        cy.get('.title').should('have.text', 'Your Cart');
        cy.get('.cart_quantity').should('have.text', 1);
        cy.get('#remove-sauce-labs-backpack').should('be.visible');
        cy.get('#continue-shopping').should('be.visible');
        cy.get('.inventory_item_name').should('have.text','Sauce Labs Backpack');

        cy.get('#remove-sauce-labs-backpack').click()
        cy.get('.removed_cart_item').should('exist');

    })

    it('Add item to cart and verify then complete checkout', ()=>{
        cy.visit('https://www.saucedemo.com/');
        Login.login('standard_user', 'secret_sauce');

        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_badge').should('have.text', 1);

        cy.get('.shopping_cart_link').click();

        cy.get('.cart_quantity').should('have.text', 1);
        cy.get('#remove-sauce-labs-backpack').should('be.visible');
        cy.get('#continue-shopping').should('be.visible');
        cy.get('.inventory_item_name').should('have.text','Sauce Labs Backpack');

        cy.get('#checkout').click();
        cy.get('#cancel').should('be.visible');
        cy.get('#continue').should('be.visible');
        cy.get('.shopping_cart_badge').should('have.text', 1);

        cy.get('#first-name').type('Ryck');
        cy.get('#last-name').type('Brown');
        cy.get('#postal-code').type('JMDCN09');
        cy.get('#continue').click();

        cy.get('.title').should('have.text', 'Checkout: Overview')
        cy.get('.inventory_item_name').should('have.text','Sauce Labs Backpack');
        cy.get('.summary_info_label').should('exist');
        cy.get('#cancel').should('be.visible');
        cy.get('#finish').should('be.visible');
        cy.get('#finish').click()
        cy.get('.pony_express').should('be.visible')  
    })

    it('Sort products from A-Z', ()=>{
        cy.visit('https://www.saucedemo.com/');
        Login.login('standard_user', 'secret_sauce');

        productData.products.sort();
        cy.get('.inventory_item_name').each((elem, index, lst)=>{
            expect(elem.text()).equal(productData.products[index].name)
        })
    })

    it('Sort products from Z-A', ()=>{
        cy.visit('https://www.saucedemo.com/');
        Login.login('standard_user', 'secret_sauce');

        cy.get('.product_sort_container').select(productData.sort['Z to A'])

        productData.products.sort().reverse();
        cy.get('.inventory_item_name').each((elem, index, lst)=>{
            expect(elem.text()).equal(productData.products[index].name)
        })
    })

    it('')
})