/* ================================================
   🔐 Authentication Check
=================================================== */
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // ✅ user is logged in — start loading store items
    loadStoreItems(user);
  } else {
    // ❌ user not logged in — send them to login page
    console.log("No user is logged in");
    window.location.href = "/login";
  }
});

/* ================================================
   📦 Load Store Items
=================================================== */
function loadStoreItems(user) {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        const itemId = doc.id;

        // Create the column div
        const col = document.createElement("div");
        col.className = "col";

        // Create the card element
        const card = document.createElement("div");
        card.className = "card shop-card h-100 text-center";

        // Item image
        const img = document.createElement("img");
        img.src = item.image;
        img.className = "card-img-top";
        img.alt = item.name;

        // Card body
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        // Item name
        const title = document.createElement("h5");
        title.className = "card-title shop-label";
        title.textContent = item.name;

        // Price with diamond icon
        const price = document.createElement("p");
        price.className = "shop-cost";
        price.innerHTML = `<span class="material-icons align-middle">diamond</span> ${item.price}`;

    /*  ===================================================
        🛒 Purchase Button Logic
        =================================================== */
        // Buy button 
        const button = document.createElement("button");
        button.className = "btn btn-primary btn-sm shop-buy-btn";
        button.textContent = "Buy";

        // Store item info in the button
        button.dataset.itemId = itemId;
        button.dataset.price = item.price;
        button.addEventListener("click", function () {
          handlePurchase(user, itemId, parseInt(item.price));
        });

        // Append everything to build the card
        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(button);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);

        // Add the card to the container in the HTML
        document.getElementById("store-item-container").appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Error getting store items:", error);
    });
}

/* ===========================================================
   🛒 Purchase Logic
   - Check if user has enough gems
   - Check if they already own the item
   - Subtract gems and add item to inventory
============================================================== */
function handlePurchase(user, itemId, price) {
  const userDocRef = db.collection("users").doc(user.uid);

  userDocRef.get().then((doc) => {
    if (!doc.exists) {
      console.error("User doc not found!");
      return;
    }

    const userData = doc.data();
    const currentGems = userData.gems || 0;
    const inventory = userData.inventory || [];

    // Check if they already own it
    if (inventory.includes(itemId)) {
      alert("You already own this item!");
      return;
    }

    // Check if they have enough gems
    if (currentGems < price) {
      alert("Not enough gems!");
      return;
    }

    // Update: subtract gems and add to inventory
    const newGems = currentGems - price;
    const newInventory = [...inventory, itemId];

    userDocRef
      .update({
        gems: newGems,
        inventory: newInventory,
      })
      .then(() => {
        alert("Item purchased successfully!");
        // Optionally: refresh page or disable the Buy button
      })
      .catch((error) => {
        console.error("Error updating user doc:", error);
      });
  });
}
