describe("Dynamic Table Test", () => {
  const inputData = [
    { name: "Bob", age: 20, gender: "male" },
    { name: "George", age: 42, gender: "male" },
    { name: "Sara", age: 42, gender: "female" },
    { name: "Conor", age: 40, gender: "male" },
    { name: "Jennifer", age: 42, gender: "female" },
  ];

  before(() => {
    cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");
  });

  it("Populate data in the table and assert", () => {
    cy.contains("Table Data").click();

    cy.get("#jsondata").invoke("val", JSON.stringify(inputData));

    cy.contains("Refresh Table").click();

    cy.get("#dynamictable > :nth-child(3)").each(($row, index) => {
      const row = $row.children();

      cy.log("Actual Text: " + row.eq(0).text());

      expect(row.eq(0).text()).to.equal(inputData[index].name);
      expect(row.eq(1).text()).to.equal(inputData[index].age.toString());
      expect(row.eq(2).text()).to.equal(inputData[index].gender);
    });
  });
});
