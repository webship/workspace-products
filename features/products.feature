Feature: The Products workspace plugin
  Once the plugin is activated and installed, the products workspace is on the dashboard, and the
  Plugins page lists the plugin with its four steps.

  Scenario: The workspace page is there
    Given I am on "/products"
     Then I should see "Products"

  Scenario: The plugin is listed on the Plugins page
    Given I am on "/settings/plugins"
     Then I should see "Products"
      And I should see "@webship/workspace-products"
