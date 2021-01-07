describe('Sapper template app', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('Warumbox sichtbar', () => {
		cy.get('[data-test=warumbox]').contains('Warum?')
	});
/*
	it('navigates to /about', () => {
		cy.get('nav a').contains('about').click();
		cy.url().should('include', '/about');
	});

	it('navigates to /blog', () => {
		cy.get('nav a').contains('blog').click();
		cy.url().should('include', '/blog');
	});
	*/
});