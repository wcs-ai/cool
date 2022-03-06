describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  });
  // 每个it是一个测试实例
  it('Visits the Kitchen Sink', () => {
    // 打开网页
    cy.visit('http://localhost:8080/#');
    // 查找页面上的东西，点击
    cy.contains("一、实列").click();
  })
})