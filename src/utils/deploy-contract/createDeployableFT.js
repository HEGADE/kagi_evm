import { transformString } from "../format/format-asset-name";

export const createDeployableTokenContractFT = (
  { name, symbol, decimals, supply, url },
  networkBeingUsed
) => {
  const formattedContractName = transformString(name);

  const traitToBeUsed =
    networkBeingUsed === "TESTNET"
      ? "ST1ETGPP1H4D5WEGEDJXG5XVY5AA3K4N2EW4ZBYE1"
      : "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE";

  const contract = `

    (impl-trait '${traitToBeUsed}.sip010-ft-trait.sip-010-trait)

(define-constant contract-owner tx-sender)

(define-fungible-token ${formattedContractName})

(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u102))

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender)  err-not-token-owner)
    (try! (ft-transfer? ${formattedContractName} amount sender recipient))
    (match memo
      memo-value (print memo-value)
      0x
    )
    (ok true)
  )
)

(define-read-only (get-name)
	(ok "${name}")
)

(define-read-only (get-symbol)
	(ok "${symbol}")
)

(define-read-only (get-decimals)
	(ok u${decimals})
)

(define-read-only (get-balance (who principal))
	(ok (ft-get-balance ${formattedContractName} who))
)

(define-read-only (get-total-supply)
	(ok (ft-get-supply ${formattedContractName}))
)

(define-read-only (get-token-uri)
	(ok (some u"${url}"))
)

(define-public (mint (amount uint) (recipient principal))
	(begin
		(asserts! (is-eq tx-sender contract-owner) err-owner-only)
		(ft-mint? ${formattedContractName} amount recipient)
	)
)

    `;

  return contract;
};
