context('Home actions', function() {
	beforeEach(function() {
		cy.visit('https://asabogalc31.github.io/VRT_colorPallete/')
	})
	
	describe('FirstScreenShot', function() {
		it('Genera la primer imagen random', function() {
			// Does the screenshot
			cy.get('[onclick="randomPalette()"]').click()
			cy.screenshot('imagenA')
		})
	})	
	
	
	describe('SecondScreenShot', function() {
		it('Genear la segunda imagen random', function() {
			// Does the screenshot
			cy.get('[onclick="randomPalette()"]').click()
			cy.screenshot('imagenB')
		})
		
	})
})

