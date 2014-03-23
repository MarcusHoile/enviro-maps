require "test_helper"

describe Marker do
  before do
    @marker = Marker.new
  end

  it "must be valid" do
    @marker.valid?.must_equal true
  end
end
