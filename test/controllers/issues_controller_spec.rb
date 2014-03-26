require "test_helper"

describe IssuesController do

    let(:issue) do
      @issue = Issue.new(title: "This is a title", description: "some description", url: "http://url.com", organisation: "Greenpeace")
    end

    describe "issue content" do
      it "has a title" do
        @issue.title.must_equal ("This is a title")
      end
    end

  # it "must get index" do
  #   get :index
  #   assert_response :success
  #   assert_not_nil assigns(:issues)
  # end

  it "must get new" do
    get :new
    assert_response :success
  end

  it "must create issue" do
    assert_difference('Issue.count') do
      post :create, issue: {  }
    end

    assert_redirected_to issue_path(assigns(:issue))
  end

  it "must show issue" do
    get :show, id: @issue
    assert_response :success
  end

  it "must get edit" do
    get :edit, id: @issue
    assert_response :success
  end

  it "must update issue" do
    put :update, id: @issue, issue: {  }
    assert_redirected_to issue_path(assigns(:issue))
  end

  it "must destroy issue" do
    assert_difference('Issue.count', -1) do
      delete :destroy, id: @issue
    end

    assert_redirected_to issues_path
  end

end
