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

export const genericsCode = `
// Remember to choose GO 1.18 version when trying this.
package main

import (
  "fmt"
)

// SumIntsOrFloats sums the values of map m. It supports both int64 and float64
// as types for map values.
func SumIntsOrFloats[K comparable, V int64 | float64](m map[K]V) V {
  var s V
  for _, v := range m {
    s += v
  }
  return s
}

func main() {
  ints := map[string]int64{
    "first": 34,
    "second": 12,
  }

  floats := map[string]float64{
    "first": 35.98,
    "second": 26.99,
  }

  fmt.Printf("Generic Sums: %v and %v\\n",
    SumIntsOrFloats[string, int64](ints),
    SumIntsOrFloats[string, float64](floats))
}
`;
