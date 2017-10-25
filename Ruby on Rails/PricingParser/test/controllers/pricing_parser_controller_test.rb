require 'test_helper'

class PricingParserControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get pricing_parser_index_url
    assert_response :success
  end

end
