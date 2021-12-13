export const defaultCode = `
  // You can edit this code!
  // Click here and start typing.
  package main

  import "fmt"

  func main() {
      fmt.Println("Hello,世界")
  }
`;

export const testingCode = `
  package main
  
  import (
      "fmt"
      "testing"
  )
  
  func IntMin(a, b int) int {
      if a < b {
          return a
      }
      return b
  }
  
  func TestIntMinBasic(t *testing.T) {
      ans := IntMin(2, -2)
      if ans != -2 {
          t.Errorf("IntMin(2, -2) = %d; want -2", ans)
      }
  }
`;

export const benchmarkCode = `
  package main
  
  import (
      "fmt"
      "testing"
  )
  
  func IntMin(a, b int) int {
      if a < b {
          return a
      }
      return b
  }
  
  func BenchmarkIntMin(b *testing.B) {
    for i := 0; i < b.N; i++ {
        IntMin(1, 2)
    }
  }
`;

export const concurrencyCode = `
  package main

  import (
      "fmt"
      "time"
  )

  func say(s string) {
      for i := 0; i < 5; i++ {
          time.Sleep(100 * time.Millisecond)
          fmt.Println(s)
      }
  }

  func main() {
      go say("world")
      say("hello")
  }
`;
