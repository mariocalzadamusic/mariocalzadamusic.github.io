async function subscribe(){
  const email = document.getElementById("email").value

  await fetch("/subscribe",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ email })
  })

  alert("Subscribed!")
}
