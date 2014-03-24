require "test_helper"

describe Issue do
  before do
    @issue = Issue.new
  end

  it "must be valid" do
    @issue.valid?.must_equal true
  end
end
