/// <reference types="cypress" />

import mockIngredientData from '../fixtures/ingredients.json';
import mockUserData from '../fixtures/user.json';
import mockOrderData from '../fixtures/order.json';

const localhost = 'http://localhost:4000/';
const modals = '#modals';
const viewportWidth = 1280;
const viewportHeight = 720;

describe('Тест моковых ингредиентов', () => {
  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.intercept('GET', '/api/ingredients', {
      body: {
        success: mockIngredientData.success,
        data: mockIngredientData.data
      }
    }).as('getIngredients');
  });

  it('Отображанеие ингредиентов из моковых данных', () => {
    cy.visit(localhost);

    cy.wait('@getIngredients');

    mockIngredientData.data.forEach((ingredient) => {
      cy.get(`[name-test="${ingredient.name}"]`);
    });
  });
});

describe('Тест добавления ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.intercept('GET', '/api/ingredients', {
      body: {
        success: mockIngredientData.success,
        data: mockIngredientData.data
      }
    }).as('getIngredients');

    cy.visit(localhost);

    cy.wait('@getIngredients');
  });

  it('Добавление булки в конструктор', () => {
    cy.get('[type-test="bun"]').first().find('button').click();

    cy.get('[bun-test="default-top-bun"]').should('not.exist');
    cy.get('[bun-test="default-bottom-bun"]').should('not.exist');
  });

  it('Добавление начинки в конструктор', () => {
    cy.get('[type-test="main"]').first().find('button').click();

    cy.get('[main-test="default-main"]').should('not.exist');
  });
});

describe('Тест модальных окон', () => {
  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.intercept('GET', '/api/ingredients', {
      body: {
        success: mockIngredientData.success,
        data: mockIngredientData.data
      }
    }).as('getIngredients');

    cy.visit(localhost);

    cy.wait('@getIngredients');
  });

  it('Открытие модального окна при клике на ингредиент', () => {
    cy.get('[ingredient-test="ingredient"]').first().find('a').click();
    cy.get(modals);
  });

  it('Закрытие модального окна по клику на крестик', () => {
    cy.get('[ingredient-test="ingredient"]').first().find('a').click();
    cy.get(modals).find('button').click();
    cy.get(modals).children().should('have.length', 0);
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.get('[ingredient-test="ingredient"]').first().find('a').click();
    cy.get('body').click('bottom');
    cy.get(modals).children().should('have.length', 0);
  });
});

describe('Тест создания заказа', () => {
  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.intercept('GET', '/api/ingredients', {
      body: {
        success: mockIngredientData.success,
        data: mockIngredientData.data
      }
    }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', {
      body: {
        success: mockUserData.success,
        user: mockUserData.user
      }
    }).as('getUser');
    cy.intercept('POST', '/api/orders', {
      body: {
        success: mockOrderData.success,
        name: mockOrderData.name,
        order: mockOrderData.order
      }
    });

    cy.visit(localhost);

    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('проверяем оформление заказа', () => {
    cy.get('[type-test="bun"]').first().find('button').click();
    cy.get('[type-test="main"]').first().find('button').click();
    cy.get('[type-test="sauce"]').first().find('button').click();

    cy.contains('Оформить заказ').click();

    cy.get(modals).contains(54791).should('exist');
    cy.get(modals).find('button').click();
    cy.get(modals).children().should('have.length', 0);

    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
