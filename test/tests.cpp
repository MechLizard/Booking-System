#include "catch/catch_amalgamated.hpp"
using namespace std;

// Test case template
TEST_CASE("Test case name", "[flag]"){
	SECTION("section 1 name"){
		string expected_text = R"(expected text)"; //What the output is expected to be
		string actual_text = R"(expected text)"; // Probe program for this
		REQUIRE(expected_text == actual_text);
	}
}